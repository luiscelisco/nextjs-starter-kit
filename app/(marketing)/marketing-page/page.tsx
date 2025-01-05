import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  keywords: [''],
  title: 'Marketing page',
  openGraph: {
    description: 'Put description of the page.',
    images: ['']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing page',
    description: 'Put description of the page.',
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [''],
  },
}

export default async function MarketingPage() {
  return (
    <PageWrapper>
      <div className='flex flex-col min-h-screen items-center mt-[2.5rem] p-3 w-full'>
        <h1 className="scroll-m-20 max-w-[600px] text-5xl font-bold tracking-tight text-center">
          Example Marketing Page with CTA
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
          Use this static page to showcase your product and get more sales with compelling copy and clear call-to-action.
        </p>
        <div className='flex gap-2 mt-2'>
          <Link href="/dashboard" className="mt-2">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
