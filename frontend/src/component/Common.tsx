import { Header, Footer } from "./Main";
import React from "react";

type CommonProps = {
  children: React.ReactNode;
};
export function Common({ children }: CommonProps) {
  return (
    <>
      <Header />
      <body>{children}</body>
      <Footer />
    </>
  );
}
