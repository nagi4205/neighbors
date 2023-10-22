import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

const radix = () => {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes</Text>
      <Button>Let's go</Button>
    </Flex>
  );
};

export default radix;
