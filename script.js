 //Getting web speech api
   var synth = window.speechSynthesis;

//Getting DOM

    const textForm = document.querySelector('form');
    const input = document.querySelector('#input');
    const rateValue = document.querySelector('#rate-value')
    const rate = document.querySelector('#rate')
    const pitchValue = document.querySelector('#pitch-value');
    const pitch = document.querySelector('#pitch');
    const voiceSelect = document.querySelector('#voice');
    const body = document.querySelector('body');
    const mess = document.querySelector('#message');
    var voices = [];

    var populateVoices = () => {
        
         voices = synth.getVoices();

         //populating the voices list
         for(var i = 0; i < voices.length; i++)
         {
             var option = document.createElement('option');
             option.textContent = voices[i].name + '('+ voices[i].lang +')';

             option.setAttribute('data-lang', voices[i].lang);
             option.setAttribute('data-name', voices[i].name);
             voiceSelect.appendChild(option);
         }

    }

    populateVoices();   //for firefox
    //for chrome as it waits for the event onvoiceschanged to be fired up before populating the list
    if(synth.onvoiceschanged !== undefined){
        synth.onvoiceschanged = populateVoices; 
    }

  //speak
  var speakIt = () =>{

       //check if speaking
      if(synth.speaking){
          console.error('Wait it is already speaking!');
        
      }

      if(input.value !== ''){

          //change backgorund image
          body.style.background = " #141414 url(back.gif) ";
          body.style.backgroundRepeat = 'repeat-x';
          body.style.backgroundSize = '100% 100%';

          //get Speak text
          var speakText = new SpeechSynthesisUtterance(input.value);
      }

      speakText.onend = (e) =>{
          console.log('Done Speaking');
          body.style.background = '#141414';
                  
      }

      speakText.onerror = (e) =>{
        console.log('Something went wrong');
    }

    //know the selected voice from option
    var selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //loop through voices and match with selected voice
    for(var i=0; i < voices.length; i++){
        
         if(voices[i].name === selectedVoice)
         {
             speakText.voice = voices[i];  // set to the selected voice
         }
    }

    //set rate and pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //make it speak
    synth.speak(speakText);
  }
  
  //make form submission eventListeners
    textForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      speakIt();
    //  input.blur();
      
  });

  //make rate value change
    $('#rate').change((e)=>{
        rateValue.textContent = rate.value;
    })

   //make pitch value change
   $('#pitch').change((e)=>{
      pitchValue.textContent = pitch.value;
   })

