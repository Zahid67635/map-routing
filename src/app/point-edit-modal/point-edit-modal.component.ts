import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutePoint } from '../app.component';

@Component({
  selector: 'app-point-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './point-edit-modal.component.html',
  styleUrl: './point-edit-modal.component.css',
})
export class PointEditModalComponent implements OnInit {
  @Input() point: RoutePoint | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RoutePoint>();

  editedPoint: RoutePoint = {
    number: 0,
    latitude: 0,
    longitude: 0,
    height: 0,
  };

  ngOnInit() {
    if (this.point) {
      this.editedPoint = { ...this.point };
    }
  }

  ngOnChanges() {
    if (this.point) {
      this.editedPoint = { ...this.point };
    }
  }

  onOverlayClick(event: Event) {
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.editedPoint);
  }

  onClose() {
    this.close.emit();
  }
}
