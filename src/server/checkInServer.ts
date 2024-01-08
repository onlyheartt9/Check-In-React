import { checkInAbi } from "@/abi/checkInAbi";
import { dealConstractData } from "@/utils/indes";
import { useState } from "react";
import {
  useContractEvent,
  useContractRead as useContractRead_wagmi,
  useContractWrite as useContractWrite_wagmi,
  useWalletClient,
} from "wagmi";

// export const CHECK_IN_ADDRESS = "0xa3ae85342e3836A2d5852F45CFCfACA0C7F6E91A";
// export const CHECK_IN_ADDRESS = "0x55b6E44254c82Ee44AfE66fa00c7f7Cc9da32Cd8";
// export const CHECK_IN_ADDRESS = "0xBbD0091D48f55287604FC6A5e141878068C6c73a";
// export const CHECK_IN_ADDRESS = "0xB55476D3489B593EB9BB02E8D18c64e46b349461";
export const CHECK_IN_ADDRESS = "0x9713b7Cb3da2eD58AcDB5B971CBeb0bD3a36D77E";

// const ConversionMethod = {
//     'Number':Number,
//     // "RedPacket":RedPacketType()
// }

// read公共方法
export const useContractRead = ({ ...params }) => {
  const [data, setData] = useState<any>();

  useContractRead_wagmi({
    ...params,
    onSuccess(data) {
      setData(dealConstractData(data));
    },
  });
  return [data];
};

// 获取所有队伍信息
export const useTeamInfo = () => {
  const { data: walletClient } = useWalletClient();
  return useContractRead({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "teamInfo",
    args: [1],
    account: walletClient?.account,
    scopeKey: "teamInfo",
    watch: true,
  });
};


// 参加红包
export const useCreateTeam = (params: any = {}) => {
  const data = useContractWrite_wagmi({
    address: CHECK_IN_ADDRESS,
    abi: checkInAbi,
    functionName: "createTeam",
    ...params,
  });
  return { ...data };
};
