import { useRouter } from "next/navigation";

interface Box {
  children: React.ReactNode;
  title: string;
  detail: string;
  url: string;
}

export const BoxMenu: React.FC<Box> = ({ children, title, detail, url }) => {

  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-3 items-center text-center rounded-xl shadow-lg px-2 py-4 border border-red-200 hover:shadow-red-300 cursor-pointer"
      onClick={() => router.push(url)}
    >
      <div className="text-gray-900">
        {children}
      </div>
      <h1 className='font-bold text-2xl text-gray-700 uppercase'>{title}</h1>
      <p className='font-light text-gray-400'>{detail}</p>
    </div>
  )
}