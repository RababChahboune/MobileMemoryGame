/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};

app.initialize();


//Declaration des variables
var myArray;
var clicked;
var count;
var won;
var lastClicked;
var firstClicked;


$( document ).ready(function() {
    //initialization de la grid
    init();
});

//function pour generer le contenue de la grid
function shuffle(a) {
    for (i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    //initialisation des variables
    myArray = ['0','1','2','3','4','5','6','7','8','9','0','1','2','3','4','5','6','7','8','9'];
    clicked = 0;
    count = 40;
    lastClicked = -1;
    firstClicked = -1;
    won = 0;
    shuffle(myArray);
    //mettre les valeurs a defauts dans l'HTML
    $("#content").empty();
    $("#counter").text("40");
    //lier la grid avec les valeurs du tableau myArray
    var row;
    for (i = 0; i < myArray.length; i++) {
        if(i%4==0){
            row = $("<div class=row></div>").appendTo("#content");
            $("<div class='col-2'></div>").appendTo(row);
        }
        $("<div class='col-2 square text-center' id='"+i+"'>"+"?"+"</div>").appendTo(row);
    }
    $(".square").click(onNumberClick);
    console.log(myArray);
}

function onNumberClick() {

    //compteur de nombre de click
    count--;
    $("#counter").text(count);
    if(count === 0){
        firstClicked = -1;
        lastClicked = -1;
        var answer = confirm("Game over! Do you wanna replay?");
        if(answer){
            init();
            return;
        }
    }
    //affichage de la valeur cliquee
    $("#"+$(this).attr('id')).text(myArray[$(this).attr('id')]);
    clicked++;
    //le 1er click
    if(clicked === 1){
        firstClicked = $(this).attr('id');
    }
    //le 2eme click
    if(clicked === 2){

        lastClicked= $(this).attr('id');
        //eliminer le click sur la meme case
        if(firstClicked === lastClicked){
            lastClicked = -1;
            clicked = 1;
        }else{
            //tester si les clicks sont egaux
            clicked = 0;
            if(myArray[firstClicked] === myArray[lastClicked]){
                $('#'+firstClicked).off();
                $('#'+firstClicked).addClass('square1');
                $('#'+firstClicked).removeClass('square');
                $('#'+lastClicked).off();
                $('#'+lastClicked).addClass('square1');
                $('#'+lastClicked).removeClass('square');
                //increment du compteur du couplage des valeurs
                won++;
                if(won === 10){
                    var answer = confirm("You have won! Do you wanna replay?");
                    if(answer){
                        init();
                        return;
                    }

                }

            }else{
                //remettre la 1er case cliquee a ?
                $("#"+firstClicked).text("?");
                firstClicked = lastClicked;
                lastClicked = -1;
                clicked = 1 ;
            }
        }

    }
}