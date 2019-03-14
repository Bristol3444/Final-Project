"use strict"

const compTwo = {
    templateUrl: "./components/comptwo.html"
    ,
    controller: ["FoodService", "$location","$element", function(FoodService, $location, $element) {
        const vm = this;

        vm.photosArray = [
            {
            photoHREF: `./assets/american.jpg`,
            cuisineID: 1,
            cuisine: `American`,
            },
            {
            photoHREF: `./assets/Greek.jpg`,
            cuisineID: 156,
            cuisine: `Greek`,
            },
            {
            photoHREF: `./assets/Chinese.jpg`,
            cuisineID: 25,
            cuisine: `Chinese`,
            },
            {
            photoHREF: `./assets/bbq.jpg`,
            cuisineID: 193,
            cuisine: `BBQ`,
            },
            {
            photoHREF: `./assets/Burger.jpeg`,
            cuisineID: 168,
            cuisine: `Burger`,
            },
            {
            photoHREF: `./assets/Thai.jpeg`,
            cuisineID: 95,
            cuisine: `Thai`,
            },
            {
            photoHREF: `./assets/Pizza.jpg`,
            cuisineID: 82,
            cuisine: `Pizza`,
            },
            {
            photoHREF: `./assets/Mexican.jpg`,
            cuisineID: 73,
            cuisine: `Mexican`,
            },
            {
            photoHREF: `./assets/Sandwich.jpg`,
            cuisineID: 304,
            cuisine: `Sandwich`,
            },
            {
            photoHREF: `./assets/Steak.jpg`,
            cuisineID: 141,
            cuisine: `Steak`,
            },
            {
            photoHREF: `./assets/Seafood.jpg`,
            cuisineID: 83,
            cuisine: `Seafood`,
            },
            {
            photoHREF: `./assets/FastFood.jpg`,
            cuisineID: 40,
            cuisine: `Fast Food`,
            },
            {
            photoHREF: `./assets/Italian.jpeg`,
            cuisineID: 55,
            cuisine: `Italian`,
            }, 
            {
            photoHREF: `./assets/Lebanese.jpg`,
            cuisineID: 66,
            cuisine: `Lebanese`,
            },
            {
            photoHREF: `./assets/breakfast.jpg`,
            cuisineID: 182,
            cuisine: `Breakfast`,
            },
        ]

        //shuffles objects in photosArray
        function shuffle(arr) {
            let i 
            let j 
            let temp;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }

        shuffle(vm.photosArray)
        console.log(vm.photosArray)



        vm.cuisineArray = []

        // tracks if all selections have been made, if so ng-if on section element turns on as loading screen.
        vm.loadIf = false

        vm.addItem = function(item, index) {
            $element.addClass("animationLeft");
            console.log("click")
            vm.cuisineArray.push(angular.copy(item))
            // console.log(vm.cuisineArray)
            // console.log(vm.photosArray)
            vm.removeAPic(index)
            setTimeout(vm.evaluateCuisineArray,1750) 
        }

        vm.evaluateCuisineArray = function() {
            if (vm.cuisineArray.length == 5) {
                vm.loadIf = true
                vm.finalSearch()
            } else if (vm.photosArray.length == 1) {
                vm.loadIf = true
                vm.finalSearch()
            }
        }
        

        vm.discardItem = function(index) {
            vm.removeAPic(index)
            if (vm.photosArray.length == 1) {
                vm.loadIf = true
                vm.finalSearch()
            }
        }




        vm.removeAPic = function(index) {
            vm.photosArray.splice(index, 1)
        }

        vm.serviceSubzoneID = FoodService.getSubzoneID()
        console.log(vm.serviceSubzoneID, "this id was passed back from the service")
        
        vm.finalSearch = function() {

            FoodService.searchRest(
                vm.serviceSubzoneID, 
                vm.cuisineArray[0], 
                vm.cuisineArray[1], 
                vm.cuisineArray[2], 
                vm.cuisineArray[3], 
                vm.cuisineArray[4])
            .then((moredata2) => {
            vm.places = moredata2.data.restaurants
            console.log(moredata2.data, "moredata2")
        })
        }





    }]  
        



}

angular
    .module("App")
    .component("compTwo", compTwo)