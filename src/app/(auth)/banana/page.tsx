"use client";

import React from "react";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});

// const handleLikeEvent = () => {
//   http.post("/api/likes", { username: "takashi" }).then((res) => {
//     console.log(res);
//     if (res.status == 200) {
//       console.log(res.status);
//     }
//   });
// };

// const handleLikeEvent = async () => {
//   const tanaka: string = "react";
//   try {
//     const response = await fetch("http://localhost/api/likes", {
//       credentials: "include",
//       method: "POST",
//       // withCredentials: true,
//       // "X-CSRF-TOKEN": csrfToken,
//       headers: {
//         "Content-Type": "application/json",
//         // Accept: "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//         // Add any other necessary headers, like authorization headers
//       },
//       body: JSON.stringify({ tanaka: tanaka }),
//     });

//     if (!response.ok) {
//       throw new Error(`Network response was not ok ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log(data); // log the response data for debugging

//     // Now, based on the response, you can update the UI accordingly.
//     // For example, if the post was liked:
//     // if (data.status === "liked") {
//     //   console.log("いいねしました。");
//     // } else {
//     //   console.log("いいねを外しました。");
//     // }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const page = () => {
  console.log("naa");
  return <></>;
};

export default page;
