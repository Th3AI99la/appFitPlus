import { DataProps } from "../controllers/CreateNutriController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateNutriService {
  async execute({
    nome,
    idade,
    genero,
    altura,
    peso,
    level,
    objetivo,
  }: DataProps) {
    try {
      // Tentar conectar na API da GOOGLE COM A CHAVE

      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

      // MODEL GOOGLE
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // CRIAR PROMPT
      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com nome: ${nome} do sexo ${genero} com peso atual: ${peso}kg, altura: ${altura}, idade: ${idade} anos e com foco e objetivo em ${objetivo}, 
        atualmente nível de atividade: ${level} e ignore qualquer outro parâmetro que não seja os passados, retorne em JSON com as respectivas propriedades, propriedade nome com nome da pessoa, 
        propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro 
        cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo 
        os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela 
        e não retorne nenhuma observação além das passadas no prompt, retorne em JSON e nenhuma propriedade pode ter acento.`
      );

      // ACESSAR A RESPOSTA NO PROMPT
      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        // Para extrair o JSON  (jsonStrin), A função  ".trim()" serve para remover espaço.
        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        // Conversão da jsonString, para um parse
        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (err) {
      //Caso não consiga, caí nesse erro!
      console.error("Erro JSON: ", err);

      // Se não conseguir criar, retornar um erro
      throw new Error("Failed create.");
    }
  }
}

export { CreateNutriService };
