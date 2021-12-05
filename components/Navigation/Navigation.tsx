import React from "react";
import { Account } from "./Account";
import { NavigationIcons } from "./Icons";
export const Navigation = ({
  connected,
  account,
}: {
  connected: boolean;
  account: string | null;
}): JSX.Element => {
  return (
    <Container>
      <Left>
        <NavigationIcons />
      </Left>
      <Right>
        <Account connected={connected} account={account} />
      </Right>
    </Container>
  );
};

const Left = ({
  children,
}: {
  children: React.ReactChild[] | React.ReactChild;
}): JSX.Element => {
  return <div className="justify-start">{children}</div>;
};

const Right = ({
  children,
}: {
  children: React.ReactChild[] | React.ReactChild;
}): JSX.Element => {
  return <div className="justify-end">{children}</div>;
};

const Container = ({
  children,
}: {
  children: React.ReactChild[] | React.ReactChild;
}): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative -mb-5 flex flex-row items-center justify-between md:w-full w-[80vw] py-3 pt-4 md:pt-8 md:px-4">
        {children}
      </div>
    </div>
  );
};
