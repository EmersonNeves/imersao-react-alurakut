import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../../src/lib/AluraCommons";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState('')

  const {
    query: { name },
  } = router;

  const githubUser = name;

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((user) => {
        return user.json();
      })
      .then((response) => {
        setUser(response.name);
      });
  }, []);




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
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">{user}</h1>
            <OrkutNostalgicIconSet />
            <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Visualizações do perfil:
            </p>
            <div style={{ color: "#5A5A5A" }}>
              <p>Total: 0, Última semana: 0, Ontem: 0</p>
            </div>
          </Box>
        </div>
      </MainGrid>
      Perfil {name}
    </div>
  );
}
