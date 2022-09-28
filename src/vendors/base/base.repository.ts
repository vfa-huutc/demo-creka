import { BASE_REPOSITORY_ERROR } from '../../configs/constants/error-code/base';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { BaseException } from '../exceptions/base.exception';
import { DataAndPagination } from '../schema/base.schema';

export class BaseRepository<Entity> extends Repository<Entity> {
  async pagination(
    where: any,
    page: number,
    pageSize: number,
    option,
  ): Promise<DataAndPagination<Entity>> {
    const skip = (page - 1) * pageSize;
    if (typeof page !== 'number' || page < 0) {
      throw new BaseException(
        BASE_REPOSITORY_ERROR.PAGE_ERROR,
        `page invalid number`,
      );
    }
    if (typeof pageSize !== 'number' || pageSize < 0) {
      throw new BaseException(
        BASE_REPOSITORY_ERROR.PAGE_SIZE_ERROR,
        `pageSize invalid number`,
      );
    }
    const [data, totalCount] = await this.findAndCount({
      where,
      ...option,
      take: pageSize,
      skip,
    });
    return this.dataAndPagination(data, totalCount, pageSize, page);
  }

  async paginationQueryBuilder(
    queryBuilder: SelectQueryBuilder<Entity>,
    page: number,
    pageSize: number,
  ) {
    if (typeof page !== 'number' || page < 0) {
      throw new BaseException(
        BASE_REPOSITORY_ERROR.PAGE_ERROR,
        `page invalid number`,
      );
    }
    if (typeof pageSize !== 'number' || pageSize < 0) {
      throw new BaseException(
        BASE_REPOSITORY_ERROR.PAGE_SIZE_ERROR,
        `pageSize invalid number`,
      );
    }
    const skip = (page - 1) * pageSize;
    const [data, totalCount] = await queryBuilder
      .take(pageSize)
      .skip(skip)
      .getManyAndCount();
    return this.dataAndPagination(data, totalCount, pageSize, page);
  }

  dataAndPagination(
    data: any,
    totalCount: number,
    pageSize: number,
    currentPage: number,
  ) {
    const pageTotal = Math.ceil(totalCount / pageSize);
    return {
      items: data.length > 0 ? data : null,
      pagination: {
        pageTotal,
        totalCount,
        currentPage,
        pageSize,
      },
    };
  }
}
