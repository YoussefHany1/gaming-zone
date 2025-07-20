import Link from 'next/link';

function Error() {
  return (
    <div className='text-center h-screen w-screen flex flex-col items-center justifycenter pt-40'>
      <h1 className="font-bold text-3xl">It seems we are running into a problem,</h1>
      <p className='text-2xl'>please try again later.</p>
      <Link href="/" className='underline py-5'>Go Back to Home Page</Link>
    </div>
  );
}
export default Error;