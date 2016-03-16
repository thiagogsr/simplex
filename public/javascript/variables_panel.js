(function(global, $) {
  function VariablesPanel() {
  }

  var fn = VariablesPanel.prototype,
      subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
      $variablesPanel = $('.variables-panel'),
      $variablesCount = $('[data-variables-count]'),
      variableFieldClass = '[data-variable-field]',
      variableFieldMarkup = $variablesPanel.find(variableFieldClass).first().clone();

  fn.init = function() {
    $variablesCount.on('change', this._updateVariables.bind(this));
  };

  fn._bindVariable = function() {
    var self = this;

    $('[data-variable]').on('change', function() {
      var variablesCount = parseInt($variablesCount.val()),
          formuleVariables = '';

      for (var i = 1; i <= variablesCount; i++) {
        if (i > 1) {
          formuleVariables += " + ";
        }
        formuleVariables += ($($('[data-variable]').get(i - 1)).val() || '0') + self._incognitaFor(i);
      }

      $('.formule-variables').text(formuleVariables);

      if (variablesCount > 0) {
        $('.formule-panel').removeClass('hide');
      } else {
        $('.formule-panel').addClass('hide');
      }
    });
  };

  fn._updateVariables = function(e) {
    var count = parseInt($variablesCount.val()),
        currentVariables = $variablesPanel.find(variableFieldClass).size(),
        missing = count - currentVariables;

    if (missing > 0) {
      for(var i = 1; i <= missing; i++) {
        var markup = variableFieldMarkup.clone();
        markup.find('input').attr('placeholder', this._incognitaFor(currentVariables + i));
        $variablesPanel.find('.row').append(markup);
      }
    } else {
      for (var i = 0; i > missing; i--) {
        $variablesPanel.find(variableFieldClass).last().remove();
      }
    }

    if (count > 0) {
      this._bindVariable();
      $variablesPanel.removeClass('hide');
    } else {
      $variablesPanel.addClass('hide');
    }
  };

  fn._incognitaFor = function(position) {
    var subscriptPositions = position.toString(10).split('').map(Number),
        subscriptPosition = '';

    subscriptPositions.forEach(function(element) {
      subscriptPosition += subscript[element];
    });

    return 'x' + subscriptPosition;
  };

  global.VariablesPanel = VariablesPanel;
})(window, jQuery);