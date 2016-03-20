(function(global, $) {
  function RestrictionsPanel() {
  }

  var fn = RestrictionsPanel.prototype,
      subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
      $variablesCount = $('[data-variables-count]'),
      $restrictionsCount = $('[data-restrictions-count]'),
      $restrictionsFields = $('.restriction-fields');

  fn.init = function() {
    $variablesCount.on('change', this._createRestrictions.bind(this));
    $restrictionsCount.on('change', this._createRestrictions.bind(this));
  };

  fn._createRestrictions = function() {
    var count = parseInt($restrictionsCount.val()),
        variablesCount = parseInt($variablesCount.val()),
        restrictionsMarkup = '';

    for (var i = 0; i < count; i++) {
      var panel = document.createElement('div');
      panel.className = 'row';

      for (var c = 0; c < variablesCount; c++) {
        if (c > 0) {
          var plus = document.createElement('div');
          plus.className = 'col-md-1 text-center';

          var plusText = document.createElement('p');
          plusText.className = 'form-control-static restriction-signal';
          plusText.appendChild(document.createTextNode('+'));
          plus.appendChild(plusText);

          panel.appendChild(plus);
        }

        var coefficientColumn = document.createElement('div');
        coefficientColumn.className = 'col-md-1';

        var coefficientGroup = document.createElement('div');
        coefficientGroup.className = 'form-group';

        var coefficientInput = document.createElement('div');
        coefficientInput.className = 'col-md-12';

        var coefficient = document.createElement('input');
        coefficient.className = 'form-control';
        coefficient.placeholder = this._incognitaFor(c + 1);
        coefficient.type = 'tel';
        coefficient.name = 'restrictions[' + i + '][]';
        coefficientInput.appendChild(coefficient);
        coefficientGroup.appendChild(coefficientInput);
        coefficientColumn.appendChild(coefficientGroup);

        panel.appendChild(coefficientColumn);
      }

      var signal = document.createElement('div');
      signal.className = 'col-md-1 text-center';

      var signalText = document.createElement('p');
      signalText.className = 'form-control-static restriction-signal';
      signalText.appendChild(document.createTextNode('≤'));
      signal.appendChild(signalText);

      panel.appendChild(signal);

      var restrictionColumn = document.createElement('div');
      restrictionColumn.className = 'col-md-1';

      var restrictionGroup = document.createElement('div');
      restrictionGroup.className = 'form-group';

      var restrictionInput = document.createElement('div');
      restrictionInput.className = 'col-md-12';

      var restriction = document.createElement('input');
      restriction.className = 'form-control';
      restriction.type = 'number';
      restriction.name = 'restrictions[' + i + '][]';
      restrictionInput.appendChild(restriction);
      restrictionGroup.appendChild(restrictionInput);
      restrictionColumn.appendChild(restrictionGroup);

      panel.appendChild(restrictionColumn);

      restrictionsMarkup += panel.outerHTML;
      restrictionsMarkup += document.createElement('hr').outerHTML;
    }

    $restrictionsFields.html(restrictionsMarkup);

    if (count > 0) {
      $('.restrictions-panel').removeClass('hide');
    } else {
      $('.restrictions-panel').addClass('hide');
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

  global.RestrictionsPanel = RestrictionsPanel;
})(window, jQuery);