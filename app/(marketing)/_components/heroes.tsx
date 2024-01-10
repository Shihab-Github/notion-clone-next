import Image from "next/image";

export const Heroes = () => {
  return (
    <div className='flex max-w-5xl flex-col items-center justify-center'>
      <div className='flex items-center'>
        <div className='relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src='/documents.png'
            fill
            alt='documents'
            className='object-contain dark:hidden'
          />
          <Image
            src='/documents-dark.png'
            fill
            alt='documents'
            className='hidden object-contain dark:block'
          />
        </div>
        <div className='relative hidden h-[400px] w-[400px] md:block'>
          <Image
            src='/reading.png'
            fill
            alt='reading'
            className='object-contain dark:hidden'
          />
          <Image
            src='/reading-dark.png'
            fill
            alt='reading'
            className='hidden object-contain dark:block'
          />
        </div>
      </div>
    </div>
  );
};
