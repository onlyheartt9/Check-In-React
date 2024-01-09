import { useTeamInfo } from "@/server/checkInServer";
import { Button, Chip } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import CreateTeamModal from "./Modal/CreateTeamModal";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import CreateTeamModal from "./Modal/CreateTeamModal";
import { Toaster } from "react-hot-toast";

function Layout({ children }) {
  const { isConnected } = useAccount();
  const router = useRouter();
  const jumpUrl = (to: string) => {
    router.push(to);
  };
  if (typeof window !== "undefined") {
    window.eee = ethers;
    // window.ddd = data;
  }
  return (
    <div className="dark">
      <header className="flex justify-between mx-8 mb-4 px-8 py-12">
        <h1
          className="text-4xl text-white text-center font-semibold cursor-pointer"
          onClick={() => jumpUrl("/home")}
        >
          NEVER-ABSENT
        </h1>

        {/* 放置全局头部内容 */}
        <div className="flex text-white items-center">
          {/* <Chip className="mr-4">当前押金：{deposit}</Chip> */}
          <CreateTeamModal className="mr-4"></CreateTeamModal>
          <Button
            // isDisabled={isConnected}
            className="mr-4"
            onPress={() => {
              if (!isConnected) {
                alert("未登录钱包！");
              }
              jumpUrl("/personal");
            }}
          >
            个人中心
          </Button>
          <ConnectButton showBalance></ConnectButton>
        </div>
      </header>
      <main>{children}</main>
      <footer>{/* 放置全局底部内容 */}</footer>
      <Toaster />
    </div>
  );
}

export default Layout;
