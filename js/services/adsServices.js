'use strict';

app.factory('adsService',
  function ($resource, baseServiceUrl) {
        
    var adsResource = $resource(
      baseServiceUrl + 'ads',
      null,
      {
          'getAll': {method:'GET'}
      }
    );

    function getAllAds (params, success, error) {
      return adsResource.getAll(params, success, error);
    }
    
    return {
      getAds: getAllAds
    }

  }
);

app.factory('townsService',
  function ($resource, baseServiceUrl) {
    var townsResource = $resource(baseServiceUrl + 'towns');

    function getAllTowns (success, error) {
      return townsResource.query(success, error);
    }

    return {
      getTowns: getAllTowns
    };
  }
);

app.factory('categoriesService',
  function ($resource, baseServiceUrl) {
    var categoriesResource = $resource(baseServiceUrl + 'categories');

    function getAllCategories (success, error) {
      return categoriesResource.query(success, error);
    }

    return {
      getCategories: getAllCategories
    };
  }
);
