import Outlet from "@/components/layout/outlet";

export default function Home() {
  return (
    <div  className="w-full min-h-screen   overflow-scroll  scrollbar ">
      <Outlet />
    </div>
  );
}
