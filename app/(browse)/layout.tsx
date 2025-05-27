import { Sidebar, SideBarSkeleton } from './_components/sidebar';
import { Navbar } from './_components/navbar';
import { Container } from './_components/container';
import { Suspense } from 'react';

const BrowseLayout = ({ 
    children,
  }: { 
    children: React.ReactNode 
  }) => {
    return (
      <>
        <Navbar />
            <div className="flex h-full bg-gray/600 pt-20">
              <Suspense fallback={<SideBarSkeleton/>}>
              <Sidebar />
              </Suspense>
              <Container>
                {children}
                </Container>
            </div>
      </>
    );
  }
  export default BrowseLayout;