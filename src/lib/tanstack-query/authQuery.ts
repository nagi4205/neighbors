import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from '../axios';
import { toast } from 'sonner';

interface UseAuthProps {
  middleware?: string;
}

interface LoginProps {
  email: string;
  password: string;
  remember?: boolean;
  // setErrors: (errors: string[]) => void;
  // その他のログインプロパティ
}

const getUser = async (): Promise<User> => {
  console.log('getUserが呼ばれました');
  const response = await axios.get('api/user');
  return response.data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
  });
};

export default function useAuth({ middleware }: UseAuthProps = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ['user'], // このキーは、useAuth()を複数回呼び出した場合に、キャッシュを共有するために必要です。
    queryFn: getUser,
    staleTime: Infinity,
    retry: false,
    // onSettled: (data, error) => {
    //   if (middleware == 'guest' && data) router.push('/');
    //   if (middleware == 'auth' && !data && error) router.push('/login');
    // }, onSettledはv５では使えない
  });

  const csrfQuery = useQuery({
    queryKey: ['csrf-cookie'],
    queryFn: () => {
      return axios.get('/sanctum/csrf-cookie');
    },
  });

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ ...props }: LoginProps) => {
      console.log('loginが呼ばれました');
      // setErrors([]);
      await csrfQuery.refetch();
      return axios.post('api/login', props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('ログインしました');
      // router.push('/home');
    },
    onError: (error, variables, context) => {
      if (error.response.status != 422) throw error;
      variables.setErrors(Object.values(error.response.data.errors).flat());
    },
  });

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      console.log('logoutが呼ばれました');
      await axios.post('api/logout');
    },
    onSuccess: () => {
      console.log('logout::onSuccessが呼ばれました');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/sign-in');
    },
    onError: (error, variables, context) => {
      throw error;
    },
  });

  return {
    user,
    isUserLoading,
    isUserError,
    csrf: csrfQuery.data,
    login,
    logout: logout.mutate,
  };
}
