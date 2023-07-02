import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Wrapper className='flex flex-col min-h-screen'>
      {/* <Header /> */}
      <main className='main flex-1 flex'>{children}</main>
      {/* <Footer /> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  & > main {
    flex: 1;
  }
`

export default DefaultLayout
