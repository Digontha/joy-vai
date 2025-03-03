"use client"
import Link from "next/link";
// import styled from 'styled-components';

export default function Home() {


  // const StyledWrapper = styled.div`
  // button {
  //   font-size: 16px;
  //   padding: 1em 3.3em;
  //   cursor: pointer;
  //   transform: perspective(200px) rotateX(15deg);
  //   color: white;
  //   font-weight: 900;
  //   border: none;
  //   border-radius: 5px;
  //   background: linear-gradient(
  //     0deg,
  //     rgba(63, 94, 251, 1) 0%,
  //     rgba(70, 135, 252, 1) 100%
  //   );
  //   box-shadow: rgba(63, 94, 251, 0.2) 0px 40px 29px 0px;
  //   will-change: transform;
  //   transition: all 0.3s;
  //   border-bottom: 2px solid rgba(70, 135, 252, 1);
  // }

  // button:hover {
  //   transform: perspective(180px) rotateX(30deg) translateY(2px);
  // }

  // button:active {
  //   transform: perspective(170px) rotateX(36deg) translateY(5px);
  // }`;

  return (
    <>

      <div className="flex text-black items-center justify-center min-h-screen bg-gray-100">

        <Link href="/login">
          {/* <StyledWrapper>
            <button>Login</button>
          </StyledWrapper> */}
          <button className="bg-black p-2 rounded-md text-white px-4">Login</button>
        </Link>

      </div>

    </>
  );
}
