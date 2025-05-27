import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";
import { Wrapper } from "./_components/sidebar/wrapper";

interface CreatorLayoutProps {
    params: {
        username: string
    };
    children: React.ReactNode;
};

const CreatorLayout = async ({
    params,
    children,
  }: {
    params: Promise<{ username: string }>;
    children: React.ReactNode;
  }) => {
    const { username } = await params;
  
    const self = await getSelfByUsername(username);
  
    if (!self) {
      redirect("/");
    }
  
    return (
      <>
        <Navbar />
        <div className="flex h-full pt-20">
          <Wrapper>
            <Sidebar />
            </Wrapper>
            <Container>
              {children}
            </Container>
        </div>
      </>
    );
  };
  
export default CreatorLayout;