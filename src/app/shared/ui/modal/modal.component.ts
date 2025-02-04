import { Component, ChangeDetectionStrategy, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  message = input<string>('');
  isOpen = input<boolean>(false);
  type = input<'success' | 'error'>('success');

  close = output<void>();

  constructor() {
    // Auto-dismiss after 5 seconds
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => {
          this.onClose();
        }, 5000);
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
