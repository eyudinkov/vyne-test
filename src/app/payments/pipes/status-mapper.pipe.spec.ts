import { TestBed } from '@angular/core/testing';
import { StatusMapperPipe } from './status-mapper.pipe';
import { PaymentStatus } from '@core/state/models/payments';

describe('StatusMapperPipe', () => {
  let pipe: StatusMapperPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusMapperPipe],
    });

    pipe = TestBed.inject(StatusMapperPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return correct color for each status', () => {
    expect(pipe.transform(PaymentStatus.CAPTURED)).toBe('blue');
    expect(pipe.transform(PaymentStatus.COMPLETED)).toBe('green');
    expect(pipe.transform(PaymentStatus.CREATED)).toBe('default');
    expect(pipe.transform(PaymentStatus.FAILED)).toBe('red');
    expect(pipe.transform(PaymentStatus.SETTLED)).toBe('lime');
    expect(pipe.transform('unknown')).toBe('default');
  });
});
