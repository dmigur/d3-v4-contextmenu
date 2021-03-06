import {ContextMenuGroup} from "./ContextMenuGroup";
import {ContextMenuItem} from "./ContextMenuItem";
import {ContextMenu} from "./ContextMenu";

export class ContextMenuFactory {

  itemIdIndex = 0;
  groupIdIndex = 0;

  /**
   * @param {object[]} dataSets
   * @returns {ContextMenu}
   */
  factory(dataSets) {
    return new ContextMenu(this.parseList(dataSets));
  }

  /**
   * @param {object[]|function} dataSetList
   * @returns {ContextMenuGroup}
   */
  parseList(dataSetList) {
    let items = [];

    this.groupIdIndex++;
    let groupId = 'd3_v4_context_menu_group_' + this.groupIdIndex;

    try {
      dataSetList = dataSetList();
    } catch (e) {}

    dataSetList.map((dataSet) => {
      this.itemIdIndex++;
      let itemId = 'd3_v4_context_menu_item_' + this.itemIdIndex;
      if (!dataSet.hasOwnProperty('label') || (!dataSet.hasOwnProperty('onClick') && !dataSet.hasOwnProperty('items'))) {
        throw new Error('Skip!! ' + JSON.stringify(dataSet) + ' can not parse.');
      }
      let label = dataSet.label;
      items.push(new ContextMenuItem(
        itemId,
        label,
        dataSet.hasOwnProperty('onClick') ? dataSet.onClick : null,
        (dataSet.hasOwnProperty('items') && dataSet.items !== null) ? this.parseList(dataSet.items) : null)
      );
    });
    return new ContextMenuGroup(groupId, items);
  }
}
