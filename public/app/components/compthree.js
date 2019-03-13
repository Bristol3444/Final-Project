"use strict";




const compThree = {
    template: `
    
    <section class="page__three">
    <p>Hello</p>
    <section class="rest__page" ng-repeat="rest in $ctrl.results track by $index" ng-style="{'background-color': 'Yellow'} ">
        <p>{{rest.restaurant.name}}</p>
        <button class="btn__lock">Go To Restaurant</button>
        <button class="btn__delete" ng-click="$ctrl.nextRest($index)">Delete</button>
    </section>
    </section>
    `,

    controller: ["FoodService", "$location", function(FoodService, $location){
        const vm = this
        vm.serviceRestList = FoodService.getRestList()

        vm.results = vm.serviceRestList.data.restaurants
        console.log(vm.serviceRestList.data.restaurants[0].restaurant.name, "this is rest list")
        vm.nextRest = (index) => {
            vm.results.splice(index, 1);
            if (vm.results == 0) {
                alert("You're too indecisive! Please restart your search")
                $location.path("/compone")

            }
            console.log(vm.results);
        }


    }]



}

angular
.module("App")
.component("compThree", compThree);