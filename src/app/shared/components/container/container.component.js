'use strict';

class ContainerComponentController {
  constructor($scope) {
    this.scope = $scope;

    this.isDetailsPanelVisible = false;

    this.container = {
      name: 'newContainer',
      image: '',
      volumes: [],
      ports: []
    }

    $scope.$on('event:showInfoUpdated', (evt, data) => {
      this.container = Object.assign({}, this.container, data);
    })
  }

  $onInit() {
    this.container = this.data;
  }

  $onChanges(simpleChange) {
    if (simpleChange[ 'data' ] && simpleChange[ 'data' ].currentValue) {
      this.container = simpleChange[ 'data' ].currentValue;
    }
  }

  onDropOverContainer(evt, data) {

    let prevContainer = this.container;

    if (data == 'volume') {
      prevContainer.volumes.push({
        name: 'new volume',
        image: ''
      })
    }
    else if (data == 'image') {
      prevContainer.image = '';
    } else {
      prevContainer.ports.push({
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int'
      })
    }

    this.container = Object.assign({}, this.container, prevContainer);
  }

  showDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'container',
      data: this.container,
      isVisible: this.isDetailsPanelVisible
    })
  }

  showVolumeDetails(evt) {
    evt.preventDefault();

    this.isDetailsPanelVisible = !this.isDetailsPanelVisible;

    this.scope.$emit('event:showInfo', {
      type: 'volume',
      data: this.container.volumes,
      isVisible: this.isDetailsPanelVisible
    })
  }
}

ContainerComponentController.$inject = [ '$scope' ];

export const ContainerComponent = {
  bindings: {
    data: '<'
  },
  controller: ContainerComponentController,
  template: require('./container.component.html')
}