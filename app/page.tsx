import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
      <div className=" relative h-[300px]">
        <Image
          className=" w-full h-full  object-cover absolute -z-10"
          width={1000}
          height={1000}
          alt=""
          src={
            "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
          }
        />
        <div className="p-4 flex justify-center items-center h-full">
          <h1 className=" text-2xl">Hello</h1>
        </div>
      </div>
    </main>
  );
}
