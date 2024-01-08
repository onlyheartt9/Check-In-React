import { useAccount, useConnect, useNetwork } from "wagmi";
import { useTeamInfo } from "@/server/checkInServer";

export default function Home() {
  const aaa = useAccount({
    onConnect: () => {
      console.log("onConnectonConnectonConnect");
    },
  });
  const bbb = useConnect();
  const ccc = useNetwork();
  const ddd = useTeamInfo();
  // console.log(aaa, bbb, ccc);
  // console.log(ddd);
  return (
    <div className="flex flex-col">
      
    </div>
  );
}
