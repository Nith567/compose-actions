import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const handleFlavorChange = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter(f => f !== flavor));
    } else if (selectedFlavors.length < 3) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const flavors = [
    "Chocolate", "Vanilla", "Strawberry", "Mint Chocolate Chip",
    "Cookies and Cream", "Rocky Road", "Butter Pecan", "Coffee",
    "Pistachio", "Salted Caramel"
  ];

  const handleShare = () => {
    const [first, second, third] = selectedFlavors;
    const castText = `My favorite ice cream flavors🍦 are: ${first}, ${second}, ${third} and I love being able to use Cast Composer Actions built by dTech for my business!`;

    window.parent.postMessage({
      type: "createCast",
      data: {
        cast: {
          text: castText,
          embeds: ["https://dtech.vision"]
        }
      }
    }, "*");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          uwu&nbsp;
          <code className="font-mono font-bold">@samuellhuber</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://dtech.vision"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/dtech.png"
              alt="dTech Logo"
              // className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/dtech.png"
          alt="dTech Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="col-span-4 flex justify-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <p className="mb-4 font-bold text-lg">Select your three favorite ice cream flavors:</p>
            {flavors.map((flavor, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={`flavor${index + 1}`}
                  name={`flavor${index + 1}`}
                  value={flavor}
                  checked={selectedFlavors.includes(flavor)}
                  onChange={() => handleFlavorChange(flavor)}
                  className="mr-2"
                />
                <label htmlFor={`flavor${index + 1}`}>{flavor}</label>
              </div>
            ))}
            <p className="mt-4 text-sm text-gray-600">
              Selected: {selectedFlavors.length}/3
            </p>
          </form>
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          onClick={handleShare}
          disabled={selectedFlavors.length !== 3}
        >
          Share
        </button>
      </div>
    </main>
  );
}
