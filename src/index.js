const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};

const player4 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};

const player5 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const players = [player1, player2, player3, player4, player5, player6];

async function getRandomCharacter(players) {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();

  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function logRollResult(characterName, block, diceResults, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResults} + ${attribute} = ${
      diceResults + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResults1 = await rollDice();
    let diceResults2 = await rollDice();

    // teste de habilidade
    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;

    if (block == "RETA") {
      TotalTestSkill1 = diceResults1 + character1.VELOCIDADE;
      TotalTestSkill2 = diceResults2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResults1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResults2,
        character2.VELOCIDADE
      );

      if (TotalTestSkill1 > TotalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto`);
        character1.PONTOS++;
      } else if (TotalTestSkill2 > TotalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto`);
        character2.PONTOS++;
      }
    }
    if (block == "CURVA") {
      TotalTestSkill1 = diceResults1 + character1.MANOBRABILIDADE;
      TotalTestSkill2 = diceResults2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResults1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResults2,
        character2.MANOBRABILIDADE
      );

      if (TotalTestSkill1 > TotalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto`);
        character1.PONTOS++;
      } else if (TotalTestSkill2 > TotalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto`);
        character2.PONTOS++;
      }
    }
    if (block == "CONFRONTO") {
      let powerResult1 = diceResults1 + character1.PODER;
      let powerResult2 = diceResults2 + character2.PODER;

      console.log(`${character1.NOME} Confrontou ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResults1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResults2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} Venceu o Confronto! \n${character2.NOME} Perdeu 1 Ponto 🐢`
        );
        character2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} Venceu o Confronto! \n${character1.NOME} Perdeu 1 Ponto 🐢`
        );
        character1.PONTOS--;
      }

      console.log(
        powerResult1 == powerResult2
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }
    console.log("-----------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado Final: ");
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate");
  }
}

(async function main() {
  console.log(
    `🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
  );

  await playRaceEngine(
    await getRandomCharacter(players),
    await getRandomCharacter(players),
  );
  await declareWinner(
    await getRandomCharacter(players),
    await getRandomCharacter(players),
  );
})();
