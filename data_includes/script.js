//Início do Script
//Inativa os prefixos do PennController (sem esse comando os códigos não funcionam)
PennController.ResetPrefix(null);
//PennController.DebugOff();
//Define a sequência de telas do experimento
Sequence("Consentimento", "Participante", "Instrucoes",randomize("Experimento"), SendResults(), "Final");
//Cria um cabeçalho. Todos os comandos dentro do cabeçalho serão rodados automaticamente antes de cada "trial"
Header(
//Define que texto será impresso na tela e que o tamanho da fonte será "1.2em"
         defaultText
            .css("font-size","1.2em")
            .print()
         ,
//Define que toda caixa de texto será impressa na tela e que o tamanho da fonte será "1.2em"
         defaultTextInput
            .css("font-size","1.2em")
            .print()
         ,
//Define que botão será impresso na tela, que o tamanho da fonte será "1.2em" e que o participante será obrigado a interagir com ele para prosseguir com o experimento
         defaultButton
            .css("font-size","1.2em")
            .center()
            .print()
            .wait()
)

newTrial("Consentimento",

      newText("<p>You have been invited to take part in a research study about how people perceive their own production of some vowel contrasts in English. The study is being conducted by NEALP (Núcleo de Estudos em Aquisição da Linguagem e Psicolinguística<br> at UFJF.</p><p>You are being asked to complete this experiment because <b>you are an adult (18 years or older), you are either a native speaker of American English or Brazilian Portuguese and you are fluent in English.</b></p><p>Any information that you provide will be anonymized and kept confidential. You may withdraw from this study at any time without penalty.<br> However, make sure you have a reliable internet connection and are able to complete the study in one sitting.</p><p>If you have questions about this research, or if you would like to receive a report of this research when it is completed, please contact the researcher<br> Carolina Macedo at carolinamacedorocha@gmail.com.</p><p>This study takes approximately <b>15 minutes.</b></p><p>By clicking 'I agree', you agree that you are at least 18 years old, that you are fluent in English and that you understand these instructions and <br>conditions of participation.</p>")
        .print()
        ,
    newButton("I Agree")
        .css("font-size","1.2em")
        .print()
        .center()
        .log()
        .wait()
)
//Cria uma nova tela - Tela de coleta de dados do participante
newTrial("Participante",
         newText("<p>Welcome</p>")
         ,
         newText("<p>Thank you for accepting our invitation to participate in our test.<br>In this test you'll be asked to answer two different tasks:<br><b>1. Identification:</b> you'll hear 2 words and answer if they're <i>the same or different</i>.<br>2. <b>Discrimination:</b> you'll hear 1 word and choose between 2 options <i>which word you heard</i>.<br>This test will take about 20 minutes.<br>We recommend that you take this test without external interruptions, wearing headphones/earphones.<br>Thank you again for your collaboration!</p>")
         ,
         newText("<p>Please, fill in your FULL NAME in the box below:</p>")
         ,
//Cria uma caixa de texto nomedada "Nome" para receber o nome do participante  
         newTextInput("Name")
         ,
         newText("<p>Select your first language:</p>")
         , 
//Cria uma caixa com seletores nomeada "L1" para que o participante selecione sua escolaridade
         newDropDown("L1", "Select your first language")
        .add("American English", "Brazilian Portuguese", "N/A")
        .css("font-size","1.2em")
        .print()
        .log() //Envia para o arquivo "results" a opção selecionada pelo participante 
         ,
         //Cria uma caixa com seletores nomeada "L2" para que o participante selecione sua escolaridade
         newDropDown("L2", "Select your second language")
        .add("American English", "Brazilian Portuguese", "N/A")
        .css("font-size","1.2em")
        .print()
        .log() //Envia para o arquivo "results" a opção selecionada pelo participante 
         ,
//Cria um botão nomeado "Start"
         newButton("Start")
         ,
//Cria uma nova variável chamada "NAME" que recebe o conteúdo da caixa de texto "Name"
    newVar("NAME")
        .global()
        .set( getTextInput("Name") )
)
//Envia para o arquivo "results" o conteúdo da variável "NAME"
.log( "NAME" , getVar("NAME") )
//Nova tela - Tela de instruções do treino
newTrial("Instrucoes",
         
    newText("<p>INSTRUCTIONS:</p>")
    ,
    newText("<p>Listen to the audio and choose the best alternative according to what you hear.</p>")
    ,    
    //Cria um novo botão nomeado "Start" e envia para o arquivo "results" a informação de quando ele é pressionado
    newButton("Start")
        .log()
)
//Indica o uso da tabela "tabela.csv"
Template("tabela.csv",
// "variable" vai automaticamente apontar para cada linha da tabela "tabela.csv"
    variable => newTrial( "Experimento",
    //Exibe na tela a imagem "speaker.png"
        newImage("speaker.png")
            .size( 90 , 90 )
            .print()
            .center()
        ,
//"variable" aponta para todas as linhas da coluna "Audio" da tabela "tabela.csv" e toca o audio referente a elas
        newAudio("Audio", variable.Audio)
            .play()
            .center()
            .print()
            .wait()
        ,


        //Cria um novo texto nomeado "A" e "variable" aponta para todas as linhas da coluna "A" e imprime o texto presente nelas 
        newText("A",variable.A)
        ,
        newText("B",variable.B)
        ,
        //Cria um canvas (uma caixa) e coloca os textos "A" e "B" um ao lado do outro
        newCanvas( 1400 , 700 )
            .add( 200 , 100 , getText("A") )
            .add( 540 , 100 , getText("B") )
            .print()
            
            //Agora, dentro do canvas, é que os textos "A" e "B" serão impressos na tela
        ,
        //Possibilita a seleção dos textos "A" e "B" através do mouse ou das teclas "A" e "B". Também envia para o arquivo "result" qual texto foi selecionado
        newSelector()
            .add( getText("A") , getText("B") )
            .keys("A","B")
            .log()
            .wait()
        
    )
    .log("RespostaCerta",variable.RC)
    .log("Speaker",variable.Speaker)
)
//Nova Tela - Tela final    
newTrial( "Final" ,
    newText("<p>This is the end of the test. Thank you for your collaboration!</p>")
        .css("font-size","1.2em")
        .print()
        .wait()
  
 )
//Ajeita a barra de progresso para que ela fique completa
.setOption("countsForProgressBar",false);
//Fim do Script
