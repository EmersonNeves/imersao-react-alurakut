import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AluraCommons";

export default function Home() {
  const githubName = "EmersonNeves";
  const githubFriends = [
    "omariosouto",
    "juunegreiros",
    "marcobrunodev",
    "filipedeschamps",
    "diego3g",
  ];
  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <img
              src={`https://github.com/${githubName}.png`}
              alt="Foto do perfil"
            />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationArea"
          style={{ gridArea: "profileRelationArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Amigos ({githubFriends.length})</h2>
            <ul>
              {githubFriends.map((friend) => (
                <li key={friend}>
                  <a href={`/users/${friend}`} >
                    <img
                      src={`https://github.com/${friend}.png`}
                      alt={`Foto de perfil do ${friend}`}
                    />
                    <span>{friend}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </div>
  );
}
