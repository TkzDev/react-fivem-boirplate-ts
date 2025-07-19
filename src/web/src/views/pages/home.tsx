import { useNuiCallback } from "@app/hooks/useNuiCallback";
import { Button } from "@views/components/Button/Button";

export function Home() {
  const fetchCallback = async () => {
    await useNuiCallback('fetch', { url: 'sended callback' }, true).then((data) => {
      alert('Response: ' + data);
    });
  }

  return (
    <div className='flex items-center justify-center flex-col w-[18rem] min-h-[18rem] bg-[#060204] rounded-3xl'>
      <div className='flex items-center justify-center mt-6'>
        <img className="object-cover max-w-32 rounded-full" src="https://github.com/TkzDev.png" alt="" />
      </div>
      <Button
        className='flex p-3 bg-green-500 rounded-md mt-5'
        onClick={() => fetchCallback()}
      >
        Click Me
      </Button>
  
      
    </div>
  )
}