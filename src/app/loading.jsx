import { Spinner } from "@heroui/react"

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>   
        <Spinner size="lg" className='text-teal-900'/>
      
</div>
    </div>
  );
}