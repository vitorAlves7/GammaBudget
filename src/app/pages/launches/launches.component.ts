import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Item {
  id?: number;
  descricao: string;
  categoria: string;
  data: string;
  valor: number;
  status?: any;
}

@Component({
  selector: 'app-launches',
  standalone: true,
  templateUrl: './launches.component.html',
  styleUrl: './launches.component.scss',
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
})
export class LaunchesComponent {
  showModal = false;
  showEditModal = false;
  showAddModal = false;
  selectedItem: any;
  editItem: any;
  newItem: any = {
    descricao: '',
    categoria: '',
    data: '',
    valor: null,
    status: '',
  };

  itemType: string | undefined;
  saldoPrevisto = 0;

  items: Item[] = [
    // { descricao: 'Item 1', categoria: 'Categoria 1', data: '2024-05-19', valor: 100 },
    // { descricao: 'Item 2', categoria: 'Categoria 2', data: '2024-05-20', valor: 200 },
    // // Outros itens...
  ];

  openModal(item: any) {
    this.selectedItem = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openEditModal() {
    this.editItem = { ...this.selectedItem };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveChanges() {
    this.closeModal();
  }

  updateItem() {
    
    if(this.selectedItem.valor< 0){
      this.editItem.valor = -Math.abs(this.editItem.valor);   
    }

    Object.assign(this.selectedItem, this.editItem);
    this.calculateSaldoPrevisto();
    this.closeEditModal();
  }

  deleteItem() {
    const index = this.items.indexOf(this.selectedItem);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.calculateSaldoPrevisto();
    this.closeModal();
  }
  deleteAllItems() {
    this.items = [];
    this.calculateSaldoPrevisto();
  }

  openAddModal(type: string) {
    this.newItem = {
      descricao: '',
      categoria: '',
      data: '',
      valor: null,
    };
    this.itemType = type;
    this.calculateSaldoPrevisto();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addItem() {
    if (this.itemType === 'despesa') {
      this.newItem.valor = -Math.abs(this.newItem.valor);
    }

    this.items.push({ ...this.newItem });
    this.calculateSaldoPrevisto();
    this.closeAddModal();
  }
  private calculateSaldoPrevisto() {
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    this.saldoPrevisto = this.items
      .filter((item) => {
        const itemDate = new Date(item.data + 'T00:00:00');
        const isSameYear = itemDate.getFullYear() === anoAtual;
        const isSameMonth = itemDate.getMonth() + 1 === mesAtual;
        const isRevenue = item.valor > 0;
        const isUnpaidExpense = item.valor < 0 && item.status === 'Não Pago';

        return isSameYear && isSameMonth && (isRevenue || isUnpaidExpense);
      })
      .reduce((saldo, item) => saldo + item.valor, 0);
  }

  ngOnInit(): void {
    this.calculateSaldoPrevisto();
  }
}
