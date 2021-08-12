import React from "react";
import { useRouter } from "next/router";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
} from "../../src/lib/AluraCommons";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";

export default function Profile() {
  const router = useRouter();

  const {
    query: { name },
  } = router;

  const githubUser = name;

  return (
    <div>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <img
              src={`https://github.com/${githubUser}.png`}
              alt="Foto do perfil"
            />
            <hr />
            <p>
              <a className="boxLink" href={`https://github.com/${githubUser}`}>
                @{githubUser}
              </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>
      </MainGrid>
      Perfil {name}
    </div>
  );
}
