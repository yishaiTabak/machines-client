import { Component, Input } from '@angular/core';
import { FilterService, BaseFilterCellComponent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query'
/**
 * NOTE: Interface declaration here is for demo compilation purposes only!
 * In the usual case include it as an import from the data query package:
 *
 * import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
 */


@Component({
    selector: 'my-dropdown-filter',
    templateUrl: './dropdownlist-filter.component.html',
  styleUrl: './dropdownlist-filter.component.css'
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  @Input() public override filter!: CompositeFilterDescriptor;
  constructor(filterService: FilterService) {
    super(filterService);
  }

    @Input() public data: any[] = [];
    @Input() public textField: string = '';
    @Input() public valueField: string = '';
    public get selectedValue(): unknown {
        const filter = this.filterByField(this.valueField);
        return filter ? filter.value : null;
    }

    public get defaultItem(): {[Key: string]: any} {
        return {
            [this.textField]: 'Select item...',
            [this.valueField]: null
        };
    }


    public onChange(value: unknown): void {
        this.applyFilter(
            value === null ? // value of the default item
                this.removeFilter(this.valueField) : // remove the filter
                this.updateFilter({ // add a filter for the field with the value
                    field: this.valueField,
                    operator: 'eq',
                    value: value
                })
        ); // update the root filter
    }
}