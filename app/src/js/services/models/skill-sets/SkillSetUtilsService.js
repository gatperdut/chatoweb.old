'use strict';

angular.module('chatoWeb')

.service('SkillSetUtilsService', ['ConstantsCache', function(ConstantsCache) {

  var findProgression = function(dependencies, attributeSet) {
    var dependencyValues = _.map(dependencies, function(dependency) {
      return attributeSet[dependency];
    });

    var mean = (dependencyValues[0] + dependencyValues[1] + dependencyValues[2]) / 3;

    if (mean < 16) {
      return 'limited';
    }
    else if (mean < 36) {
      return 'below_average';
    }
    else if (mean < 66) {
      return 'standard';
    }
    else if (mean < 86) {
      return 'above_average';
    }
    else {
      return 'plus';
    }
  };

  var categoryRankByName = function(skillCategoryName, model) {
    var skillCategory = categoryByName(skillCategoryName);
    return categoryRank(skillCategory, model);
  };

  var categoryRank = function(skillCategory, character) {
    var progression = findProgression(skillCategory.dependencies, character.attribute_set);

    var chartElements = ConstantsCache.storage.skillCategories.ranks[progression];

    var result = null;
    var found  = false;

    _.each(chartElements, function(chartElement) {
      if (chartElement.value >= character.skill_set[skillCategory.name]) {
        if (!found) {
          result = chartElement;
        }
        found = true;
      }
    });

    return result;

  };

  var rank = function(skill, character) {
    var progression = findProgression(skill.dependencies, character.attribute_set);

    var chartElements = ConstantsCache.storage.skills.ranks[progression];

    var result = null;
    var found  = false;

    _.each(chartElements, function(chartElement) {
      if (chartElement.value >= character.skill_set[skill.name]) {
        if (!found) {
          result = chartElement;
        }
        found = true;
      }
    });

    return result;
  };

  var categoryByName = function(skillCategoryName) {
    return _.find(ConstantsCache.storage.skillCategories.all, { name: skillCategoryName });
  };

  var skillModifierLabel = function(value) {
    return ConstantsCache.storage.skills.labels[Math.floor(value / 10)];
  };

  return {

    categoryRank: categoryRank,

    rank: rank,

    categoryRankByName: categoryRankByName,

    skillModifierLabel: skillModifierLabel

  };

}]);