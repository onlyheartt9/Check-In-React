// import { useLinkApproveEvent } from "@/server/linkServer";
import { useCreateTeam } from "@/server/checkInServer";
import { useLocalStorage } from "@/utils/indes";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useTransaction } from "wagmi";

export const CreateTeamModalStore = () => {
  const [value, setValue] = useLocalStorage("add-deposit-value", 0);
  const [step, setStep] = useLocalStorage("add-deposit-step", "approval");
  const [depositLoading, setDepositLoading] = useLocalStorage(
    "add-deposit-loading",
    true
  );
  const [approvalTx, setApprovalTx] = useLocalStorage("add-deposit-tx", null);
  const { isLoading } = useTransaction({
    hash: approvalTx, 
  });

  useEffect(() => {
    if (approvalTx && !isLoading) {
      setApprovalTx(null);
      setDepositLoading(false);
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
    depositLoading,
    setDepositLoading,
    step,
    setStep,
  };
};
