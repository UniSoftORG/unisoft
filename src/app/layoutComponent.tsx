import { PrepareRenderer } from "@/renderer/PrepareRenderer";
import { Suspense } from "react";

const LayoutComponent = ({ data }: any) => {
  return (
    <Suspense>
      <PrepareRenderer component={data} key={"laypit"} />
    </Suspense>
  );
};

export default LayoutComponent;
