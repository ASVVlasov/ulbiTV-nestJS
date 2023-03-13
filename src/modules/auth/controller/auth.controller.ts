import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { Public } from '../../../decorators/public-guard.decorator';
import { CreateAuthDto } from '../dto/auth-request.dto';
import { AuthResponseDto } from '../dto/signin-response.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Public()
  @Post('/signin')
  public signin(@Body() authDto: CreateAuthDto): Promise<AuthResponseDto> {
    return this.authService.signin(authDto);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Public()
  @Post('/signup')
  public signup(@Body() authDto: CreateAuthDto) {
    return this.authService.signup(authDto);
  }
}
