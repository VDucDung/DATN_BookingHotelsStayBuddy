import { Suspense } from 'react';
import Search from './Search';
import Loading from "@/components/loading";

export default function SearchPage() {

  return (
    <Suspense fallback={<Loading className="mt-5 mx-auto" />}>
      <Search />
     </Suspense>
  );
}
