import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/hr.svg"}
            alt="Croate"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Croate
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/es.svg"}
            alt="Espagnol"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Espagnol
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/fr.svg"}
            alt="Français"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Français
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/it.svg"}
            alt="Italien"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italien
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/jp.svg"}
            alt="Japonais"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japonais
        </Button>
      </div>
    </footer>
  );
};
