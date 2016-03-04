(function(global, $) {
  function VariablesPanel() {
  }

  var fn = VariablesPanel.prototype,
      subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
      $variablesPanel = $('.variables-panel'),
      variableFieldClass = '.variable-field',
      variableFieldMarkup = $variablesPanel.find(variableFieldClass).first().clone();

  fn.init = function() {
    $('#variables_count').on('change', this._updateVariables);
  };

  fn._updateVariables = function() {
    var count = parseInt($(this).val()),
        currentVariables = $variablesPanel.find(variableFieldClass).size(),
        missing = count - currentVariables;

    if (missing > 0) {
      for(var i = 1; i <= missing; i++) {
        var markup = variableFieldMarkup.clone(),
            subscriptPositions = (currentVariables + i).toString(10).split('').map(Number),
            subscriptPosition = '';

        subscriptPositions.forEach(function(element) {
          subscriptPosition += subscript[element];
        });

        markup.find('input').attr('placeholder', 'x' + subscriptPosition);
        $variablesPanel.find('.row').append(markup);
      }
    } else {
      for (var i = 0; i > missing; i--) {
        $variablesPanel.find(variableFieldClass).last().remove();
      }
    }

    if (count > 0) {
      $variablesPanel.removeClass('hide');
    } else {
      $variablesPanel.addClass('hide');
    }
  };

  global.VariablesPanel = VariablesPanel;
})(window, jQuery);