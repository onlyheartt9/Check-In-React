// import { useLinkApproveEvent } from "@/server/linkServer";
import { useCreateTeam } from "@/server/checkInServer";
import { useLocalStorage } from "@/utils/indes";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useTransaction } from "wagmi";

export const CreateTeamModalStore = () => {
  const [value, setValue] = useState(0);
  const [approvalTx, setApprovalTx] = useState(null);
  const { isLoading } = useTransaction({
    hash: approvalTx,
  });

  useEffect(() => {
    if (approvalTx && !isLoading) {
      setApprovalTx(null);
    }
  }, [approvalTx, isLoading]);

  const { write } = useCreateTeam();

  // useLinkApproveEvent({
  //   eventName: "Approval",
  //   listener: () => {},
  // });
  const onAddDeposit = () => {
    // const args = "SINGLE" | "DOUBLE" | "TRIPLE";
    const args = "SINGLE";
    write({
      args: [args],
    });
  };
  return {
    value,
    setValue,
    onAddDeposit,
    approvalTx,
    setApprovalTx,
  };
};
