"use client";

export default function Navigation() {
  return (
    <>
      <aside className='group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary'>
        <div>
          <p>Action Items</p>
        </div>
        <div className='mt-4'>
          <p>Documents</p>
        </div>
        <div className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100' />
      </aside>
    </>
  );
}
