"use client";
import { PrepareRenderer } from "@/renderer/PrepareRenderer";
import React from "react";

export const ClientLayout = React.memo(
  (props: { navigation: any }, context) => (
    <PrepareRenderer component={props.navigation} />
  )
);
