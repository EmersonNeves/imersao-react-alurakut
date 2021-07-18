import React, { useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraCommons";

export default function Home() {
  const [communities, setCommunities] = useState([
    {
      title: 'Alura',
      image: 'data:image/png;base64,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',
      address: 'https://www.alura.com.br/'
  }
]);
  const githubName = "EmersonNeves";
  const githubFriends = [
    "omariosouto",
    "juunegreiros",
    "marcobrunodev",
    "filipedeschamps",
    "diego3g",
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const image = formData.get("image");
    const address = formData.get("address");

    const community = {
      id: new Date().toISOString,
      title,
      image,
      address,
    };

    const currentCommunities = [...communities, community];

    setCommunities(currentCommunities);

    event.target.reset();
  }
  return (
    <div>
      <AlurakutMenu githubUser={githubName} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <img
              src={`https://github.com/${githubName}.png`}
              alt="Foto do perfil"
            />
            <hr />
            <p>
              <a className="boxLink" href={`https://github.com/${githubName}`}>
                @{githubName}
              </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-Vindo(a), {githubName}</h1>
            <OrkutNostalgicIconSet />
            <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Visualizações do perfil:
            </p>
            <div style={{ color: "#5A5A5A" }}>
              <p>Total: 0, Última semana: 0, Ontem: 0</p>
            </div>
            <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Sorte de hoje:
            </p>
            <p style={{ color: "#5A5A5A" }}>
              Você participou da Imersão Alura.
            </p>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Qual vai ser o foto da sua comunidade?"
                  name="image"
                  aria-label="Qual vai ser o foto da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Qual o endereço da sua comunidade?"
                  name="address"
                  aria-label="Qual o endereço da sua comunidade?"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
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
                  <a href={`/users/${friend}`}>
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

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((community) => (
                <li key={community.id}>
                  <a href={`/communities/${community.title}`}>
                    <img
                      src={community.image}
                      alt={`Foto de perfil do ${community.image}`}
                    />

                    <span>
                      <a
                        href={community.address}
                        target="_blank"
                        style={{
                          height: "15px",
                          textDecoration: "none",
                          color: "white",
                          zIndex: "2",
                        }}
                      >
                        {" "}
                        {community.title}
                      </a>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </div>
  );
}
