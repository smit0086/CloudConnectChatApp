import React from "react"
import { StyledCardContainer, StyledNavBarContainer, StyledSurface } from "./Styled"
import NavBar from "../nav/NavBar"
import { StyledCard } from "../ui/Card/Card"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <StyledSurface>
      <StyledNavBarContainer>
        <NavBar />
        </StyledNavBarContainer>
        <StyledCardContainer>
        <StyledCard>
            {props.children}
        </StyledCard>
        </StyledCardContainer>
    </StyledSurface>
  )
}

export default Layout